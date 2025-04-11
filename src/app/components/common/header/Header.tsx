'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/stores/store';
import SideMenuBar from '@/app/components/common/header/SideMenubar';
import HeaderMenuBar from '@/app/components/icons/HeaderMenuBar';
import HeaderBoardButton from '@/app/components/common/header/Boards';
import HeaderUserIcon from '@/app/components/icons/HeaderUserIcon';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import useDropdown from '@/app/hooks/useDropdown';
import HeaderTeam from '@/app/components/common/header/HeaderTeam';
import getUser, { GetUserResponse } from '@/app/lib/user/getUser';
import useLogout from '@/app/hooks/useLogout';
import { setAccessToken } from '@/app/stores/auth/authSlice';
import instance from '@/app/lib/instance';

export default function Header() {
  const [visible, setVisible] = useState<boolean>(false);
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const router = useRouter();
  const { handleLogout } = useLogout();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state: RootState) => state.auth);

  const { data: userData } = useQuery<GetUserResponse>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: Boolean(accessToken),
  });
  const isLoggedIn = !!accessToken;

  const handleOpenSlideMenubar = (): void => {
    setVisible(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSlideMenubar = (): void => {
    setVisible(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown(e);
    }
  };

  // 디버깅용: 액세스 토큰 만료 테스트
  const testTokenExpiration = () => {
    // 강제로 만료된 토큰으로 설정 (3초 후 만료되는 토큰)
    console.log('[디버깅] 액세스 토큰 만료 테스트 시작');
    
    // 현재 시간보다 3초 뒤에 만료되는 토큰 헤더 생성
    const header = { alg: 'HS256', typ: 'JWT' };
    const currentTime = Math.floor(Date.now() / 1000);
    const payload = {
      sub: 'test',
      exp: currentTime + 3, // 3초 후 만료
      iat: currentTime
    };
    
    // Base64 인코딩 함수
    const base64url = (str: string) => {
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };
    
    // 테스트용 가짜 JWT 생성
    const fakeToken = 
      base64url(JSON.stringify(header)) + '.' + 
      base64url(JSON.stringify(payload)) + '.fake-signature';
    
    console.log('[디버깅] 임시 토큰 생성 완료, 3초 후 만료');
    console.log('[디버깅] 현재 시간:', new Date().toLocaleTimeString());
    console.log('[디버깅] 만료 시간:', new Date((currentTime + 3) * 1000).toLocaleTimeString());
    
    // 가짜 토큰 저장
    dispatch(setAccessToken(fakeToken));
    
    // 3초 후 API 호출하여 토큰 갱신 테스트
    setTimeout(() => {
      console.log('[디버깅] 3초 경과, 만료된 토큰으로 API 요청 시도');
      instance.get('/user')
        .then(response => {
          console.log('[디버깅] API 요청 성공 (토큰 갱신이 잘 작동함):', response.data);
        })
        .catch(error => {
          console.error('[에러] API 요청 실패:', error);
        });
    }, 3100);
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-40 h-[3.75rem] w-full bg-background-secondary px-4 tablet:px-6 xl:px-0">
        <div className="mx-auto flex h-full items-center justify-between xl:max-w-[75rem]">
          <div className="flex items-center gap-4 tablet:gap-8 xl:gap-10">
            {isLoggedIn && (
              <button
                className="tablet:hidden"
                onClick={handleOpenSlideMenubar}
                aria-label="Open Menu"
              >
                <HeaderMenuBar />
              </button>
            )}
            <div className="h-5 w-[6.3rem] xl:h-8 xl:w-[9.8rem]">
              <Link className="block h-full w-full" href="/">
                <Image
                  className="object-contain"
                  src="/logos/HeaderLogo.png"
                  alt="logo"
                  width={158}
                  height={32}
                />
              </Link>
            </div>
            {/* 자유게시판 버튼 */}
            {isLoggedIn && (
              <>
                <HeaderTeam type="header" />
                <HeaderBoardButton className="hidden tablet:block" />
              </>
            )}
          </div>
          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={testTokenExpiration}
                    className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                  >
                    테스트: 3초 토큰
                  </button>
                )}
                <div
                  className="relative flex cursor-pointer items-center gap-2"
                  onClick={toggleDropdown}
                  role="button"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                >
                  <HeaderUserIcon />
                  <span className="hidden hover:text-interaction-hover xl:block">
                    {userData?.nickname || '사용자'}
                  </span>

                  <Dropdown
                    className="right-28 top-4 xl:right-[8rem] xl:top-7"
                    onClose={closeDropdown}
                  >
                    <DropdownList className="w-28 xl:w-[135px]" isOpen={isOpen}>
                      <DropdownItem
                        className="xl:text-base"
                        onClick={() => {
                          closeDropdown();
                          router.push('/myhistory');
                        }}
                      >
                        마이 히스토리
                      </DropdownItem>
                      <DropdownItem
                        className="xl:text-base"
                        onClick={() => {
                          closeDropdown();
                          router.push('/mypage');
                        }}
                      >
                        계정 설정
                      </DropdownItem>
                      <DropdownItem
                        className="xl:text-base"
                        onClick={() => {
                          closeDropdown();
                          router.push('/invitation');
                        }}
                      >
                        팀 참여
                      </DropdownItem>
                      <DropdownItem
                        className="xl:text-base"
                        onClick={() => {
                          closeDropdown();
                          handleLogout();
                        }}
                      >
                        로그아웃
                      </DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  className="text-md hover:text-interaction-hover xl:text-base"
                  href="/login"
                >
                  로그인
                </Link>
                <Link
                  className="text-md hover:text-interaction-hover xl:text-base"
                  href="/signup"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 사이드 메뉴 바 */}
      <SideMenuBar visible={visible} onClose={handleCloseSlideMenubar} />
    </>
  );
}
