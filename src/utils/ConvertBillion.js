// 숫자를 "억" 단위로 변환하는 함수
export default function ConvertBillion(amount) {
  const billion = 100000000; // 1억을 나타내는 숫자
  return `${(amount / billion).toFixed(0)}억`; // 억 단위로 나누고 소수점 제거
}
