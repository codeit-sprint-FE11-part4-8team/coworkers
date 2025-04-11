import { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import postSignInApi from '@/app/lib/auth/postSignInApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/app/stores/auth/authSlice';
import { useRouter } from 'next/navigation';
import useToast from '@/app/hooks/useToast';
import Cookies from 'js-cookie';

const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: postSignInApi,
    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data;
      
      console.log('[디버깅] 로그인 성공, 토큰 저장 시작');
      
      // 리프레시 토큰을 HTTP-only 쿠키로 저장하기 위해 API 라우트 호출
      fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })
        .then((res) => {
          if (res.ok) {
            console.log('[디버깅] 리프레시 토큰이 쿠키에 성공적으로 저장되었습니다.');
          } else {
            console.error('[에러] 리프레시 토큰 쿠키 저장 실패');
          }
        })
        .catch((error) => {
          console.error('[에러] 쿠키 설정 API 호출 중 오류:', error);
        });

      // Redux에 액세스 토큰과 사용자 정보만 저장
      dispatch(setCredentials({ accessToken, user }));
      console.log('[디버깅] Redux에 액세스 토큰과 사용자 정보 저장 완료');

      // 개발 환경에서 토큰 만료 시간 확인을 위한 디버깅
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expTime = new Date(payload.exp * 1000);
        console.log('[디버깅] 액세스 토큰 만료 시간:', expTime.toLocaleString());
        console.log('[디버깅] 현재 시간으로부터', Math.floor((expTime.getTime() - Date.now()) / 1000), '초 후 만료');
      } catch (e) {
        console.error('[에러] 토큰 디코딩 실패:', e);
      }

      // 메인 페이지로 리디렉션
      router.push('/');
    },
    onError: (error: unknown) => {
      console.error('[에러] 로그인 실패:', error);
      if (isAxiosError(error) && error.response) {
        showToast({ message: '로그인에 실패했어요.🙁', type: 'error' });
      } else {
        showToast({
          message: '로그인 중 오류가 발생했어요.🙁',
          type: 'error',
        });
      }
    },
  });
};

export default useSignIn;
