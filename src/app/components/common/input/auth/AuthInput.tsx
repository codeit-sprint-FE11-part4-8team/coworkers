import { MouseEvent, ReactNode, useState } from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import Visibility from '@public/icons/ic_visibility.svg';
import InVisibility from '@public/icons/ic_invisibility.svg';
import Image from 'next/image';

type AuthInputProps = {
  name: string; // 필드 이름 (폼 데이터의 키)
  title: string; // 라벨 제목
  type: string; // input 타입 (예: text, password 등)
  placeholder: string; // 플레이스홀더
  autoComplete: string; // 자동 완성 옵션
  validationRules?: RegisterOptions; // react-hook-form 유효성 검증 규칙
  backgroundColor?: string; // 입력 필드 배경색
  customButton?: ReactNode; // 추가 버튼 컴포넌트
};

function AuthInput({
  name,
  title,
  type = 'text',
  placeholder,
  autoComplete,
  validationRules,
  backgroundColor = 'bg-background-secondary',
  customButton,
}: AuthInputProps) {
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const isPassword = type === 'password';
  const inputType = isPassword ? (isVisibleToggle ? 'text' : 'password') : type;

  const handleToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisibleToggle(!isVisibleToggle);
  };

  const inputBorderClass = errors[name]
    ? 'border-status-danger' // 에러시 border 색상
    : 'border-[#F8FAFC1A]'; // 기본 border 색상

  return (
    <div className="flex flex-col gap-3">
      <label className="text-text-primary text-base font-medium" htmlFor={name}>
        {title}
      </label>

      <div className="relative">
        <input
          className={`focus:border-interaction-focus placeholder:text-text-danger text-text-primary h-full w-full rounded-xl border px-4 py-[0.85rem] placeholder:text-lg focus:outline-none ${backgroundColor} ${inputBorderClass}`}
          {...register(name, validationRules)}
          type={inputType}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPassword && customButton && (
          <div className="absolute right-4 top-3 z-20">{customButton}</div>
        )}
        {isPassword && !customButton && (
          <button
            className="absolute right-4 top-3 z-10"
            type="button"
            onClick={handleToggleClick}
          >
            {isVisibleToggle ? (
              <Image src={Visibility} alt="보이게하기" width={24} height={24} />
            ) : (
              <Image
                src={InVisibility}
                alt="안보이게하기"
                width={24}
                height={24}
              />
            )}
          </button>
        )}
      </div>

      {errors[name] && (
        <span className="text-status-danger text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}

export default AuthInput;