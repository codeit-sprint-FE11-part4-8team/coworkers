import axios, { AxiosRequestConfig } from 'axios';
import { store } from '@/app/stores/store';
import { setAccessToken } from '@/app/stores/auth/authSlice';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onAccessTokenFetched = (token: string) => {
  // 저장된 모든 요청 콜백을 실행
  console.log(
    '[디버깅] 새로운 액세스 토큰을 받아 대기 중인 요청을 처리합니다.',
  );
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const handleTokenRefresh = async (errorConfig: AxiosRequestConfig) => {
  console.log('[디버깅] 401 오류 감지, 토큰 갱신 프로세스 시작');
  
  const retryRequest = new Promise((resolve, reject) => {
    refreshSubscribers.push((token: string) => {
      console.log('[디버깅] 새로운 토큰으로 요청을 재시도합니다.');
      const newConfig = {
        ...errorConfig,
        headers: {
          ...errorConfig.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      // 토큰 갱신 후 재시도할 요청을 실행
      axios.request(newConfig).then(resolve).catch(reject);
    });
  });

  if (!isRefreshing) {
    console.log('[디버깅] 토큰 갱신 프로세스를 시작합니다.');
    // 만약 토큰 갱신이 진행 중이지 않으면
    isRefreshing = true;

    try {
      console.log('[디버깅] 액세스 토큰을 갱신하기 위한 요청을 보냅니다.');
      // API 라우트 호출 (리프레시 토큰은 쿠키에서 자동으로 전송됨)
      const response = await fetch('/api/auth/refresh', { 
        method: 'POST',
        credentials: 'include', // 쿠키 포함
      });
      
      if (!response.ok) {
        throw new Error(`토큰 갱신 실패: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('[디버깅] 새 액세스 토큰을 받았습니다');
      
      // 만료 시간 디버깅
      try {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        const expTime = new Date(payload.exp * 1000);
        console.log('[디버깅] 새 액세스 토큰 만료 시간:', expTime.toLocaleString());
        console.log('[디버깅] 현재 시간으로부터', Math.floor((expTime.getTime() - Date.now()) / 1000), '초 후 만료');
      } catch (e) {
        console.error('[에러] 토큰 디코딩 실패:', e);
      }
      
      // Redux 상태에 새 액세스 토큰 저장
      store.dispatch(setAccessToken(data.accessToken));

      // 대기 중인 모든 요청 콜백을 실행
      onAccessTokenFetched(data.accessToken);
    } catch (refreshError) {
      console.error('[에러] 토큰 갱신에 실패했습니다:', refreshError);
      // 리프레시 토큰으로 갱신이 실패하면 에러를 반환
      return Promise.reject(refreshError);
    } finally {
      console.log('[디버깅] 토큰 갱신 프로세스가 완료되었습니다.');
      isRefreshing = false;
    }
  } else {
    // 이미 토큰 갱신 중이라면 대기 중인 요청을 저장하고, 갱신된 토큰을 가지고 요청을 재시도
    console.log(
      '[디버깅] 토큰 갱신이 진행 중이므로 요청을 대기 큐에 추가합니다.',
    );
  }

  return retryRequest;
};

export default handleTokenRefresh;
