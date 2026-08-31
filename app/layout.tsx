import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hyunchanwi.github.io/oop2-study/'),
  title: 'Object Note | 객체지향프로그래밍 2 학습실',
  description: '인하대 객체지향프로그래밍 2 강의를 코드, 개념 비교, 확인 문제로 공부하는 개인 학습 노트',
  openGraph: {
    title: 'Object Note | 객체지향프로그래밍 2 학습실',
    description: 'C++ 클래스, 배열, 포인터를 예제와 문제로 공부하는 개인 학습 노트',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Object Note | 객체지향프로그래밍 2 학습실',
    description: 'C++ 클래스, 배열, 포인터를 예제와 문제로 공부하는 개인 학습 노트',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
