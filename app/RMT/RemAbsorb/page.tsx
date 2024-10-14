import { cookies } from "next/headers";
import RemAbsorbPage from "./components/mainPage";

const RemAbsorb: React.FC = () => {
  const RemAbsorbInstuctionReaded = cookies().get(
    "RemAbsorbInstuctionReaded"
  )?.value;

  return (
    <>
      <RemAbsorbPage
        iRemAbsorbInstuctionReaded={RemAbsorbInstuctionReaded}
      ></RemAbsorbPage>
    </>
  );
};

export default RemAbsorb;
