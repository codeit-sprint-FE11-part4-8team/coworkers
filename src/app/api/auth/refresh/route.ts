// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    // 쿠키에서 리프레시 토큰 가져오기
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    
    if (!refreshToken) {
      console.error('[서버 에러] 리프레시 토큰이 없습니다.');
      return NextResponse.json(
        { error: '리프레시 토큰이 없습니다.' },
        { status: 401 }
      );
    }
    
    // 백엔드 서버에 리프레시 요청
    console.log('[서버 디버깅] 백엔드에 리프레시 토큰으로 새 액세스 토큰 요청');
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      { refreshToken }
    );
    
    // 새 액세스 토큰 반환
    console.log('[서버 디버깅] 새 액세스 토큰 발급 성공');
    
    // 액세스 토큰 만료 시간 디버깅 (JWT 디코딩)
    try {
      const token = response.data.accessToken;
      const payload = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      const expTime = new Date(payload.exp * 1000);
      console.log('[서버 디버깅] 새 액세스 토큰 만료 시간:', expTime.toLocaleString());
    } catch (e) {
      console.error('[서버 에러] 토큰 디코딩 실패:', e);
    }
    
    return NextResponse.json(
      { accessToken: response.data.accessToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('[서버 에러] 리프레시 토큰 갱신 중 오류:', error);
    return NextResponse.json(
      { error: '토큰 갱신에 실패했습니다.' },
      { status: 401 }
    );
  }
}