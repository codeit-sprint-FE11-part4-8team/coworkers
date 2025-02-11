'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/stores/store';
import { logout } from '@/app/stores/auth/authSlice';
import SideMenuBar from '@/app/components/common/header/SideMenubar';
import HeaderMenuBar from '@/app/components/icons/HeaderMenuBar';
import HeaderBoardButton from '@/app/components/common/header/Boards';
import HeaderUserIcon from '@/app/components/icons/HeaderUserIcon';
import Dropdown from '@/app/components/common/dropdown/Dropdown';
import DropdownItem from '@/app/components/common/dropdown/DropdownItem';
import DropdownList from '@/app/components/common/dropdown/DropdownList';
import useDropdown from '@/app/hooks/useDropdown';
import HeaderTeam from '@/app/components/common/header/HeaderTeam';

export default function Header() {
  const [visible, setVisible] = useState<boolean>(false);
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const isLoggedIn = !!accessToken;

  const handleOpenSlideMenubar = (): void => setVisible(true);
  const handleCloseSlideMenubar = (): void => setVisible(false);

  const handleLogout = (): void => {
    dispatch(logout());
    router.push('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown(e);
    }
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
              <div
                className="relative flex cursor-pointer items-center gap-2"
                onClick={toggleDropdown}
                role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
              >
                <HeaderUserIcon />
                <span className="hidden hover:text-interaction-hover xl:block">
                  {user?.nickname || '사용자'}
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
            ) : (
              <Link
                className="text-md hover:text-interaction-hover xl:text-base"
                href="/login"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 사이드 메뉴 바 */}
      <SideMenuBar visible={visible} onClose={handleCloseSlideMenubar} />
    </>
  );
}
