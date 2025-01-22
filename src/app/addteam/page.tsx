'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import Input from '@/app/components/common/input/Input';
import IconProfile from '@/app/components/icons/IconProfile';
import postImage from '@/app/lib/image/postImage';

function Page() {
  const [profileImage, setProfileImage] = useState('');
  const method = useForm();
  const { register, handleSubmit } = method;

  // 파일 처리하는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // 미리보기 URL 생성
      setProfileImage(url); // 미리보기 이미지 업데이트
    }
  };

  const onSubmit = async ({ profile, name }: FieldValues) => {
    try {
      if (profile && profile[0] instanceof File) {
        const formData = new FormData();

        formData.append('image', profile[0]);

        const img = await postImage(formData);
        console.log(img);
      }
    } catch (error) {
      alert(`팀 생성에 실패했습니다`);
    }
  };

  return (
    <div>
      <div className="mx-auto mt-[3.75rem] max-w-[23.4375rem] px-4 pt-[4.5rem] tablet:w-[28.75rem] tablet:px-0 tablet:pt-[6.25rem]">
        <h2 className="mb-6 text-center text-2xl font-medium text-text-primary tablet:mb-20">
          팀 생성하기
        </h2>
        <FormProvider {...method}>
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <span className="mb-3 inline-block">팀 프로필</span>
              <label
                htmlFor="profile"
                className="relative block h-16 w-16 cursor-pointer"
              >
                <input
                  id="profile"
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  {...register('profile')}
                  onChange={handleFileChange}
                />
                {profileImage ? (
                  <Image src={profileImage} fill alt="프로필 이미지" />
                ) : (
                  <IconProfile />
                )}
              </label>
            </div>
            <Input
              name="name"
              title="팀 이름"
              type="text"
              placeholder="팀 이름을 입력해주세요."
              autoComplete="off"
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Page;
