import bigInt from "big-integer";

export default function formatAmount(amount) {
  const bigIntAmount = bigInt(amount);
  const billion = bigInt(100000000); //n을 붙이면 bigInt 라이브러리와는 별개의 bigInt가 사용됨
  const trillion = bigInt(1000000000000);

  if (bigIntAmount.geq(trillion)) {
    //amount가 trillion보다 같거나 크다 조건문 bigInt라이브러리 메소드
    const trillions = bigIntAmount.divide(trillion).toString(); // 조 계산 divide는 bigInt라이브러리 메소드
    const billions = bigIntAmount.mod(trillion).divide(billion).toString(); // 억 계산 toString가 bigInt라이브러리에 사용시 소수점 사라짐
    return `${trillions}조 ${billions}억 원`;
  } else {
    return `${bigIntAmount.divide(billion)}억 원`;
  }
}
