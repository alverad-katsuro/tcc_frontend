import IframeCustom from "@/components/dashborad/IframeCustom";

const PAGE_INIT_LATTE = process.env.PAGE_INIT_LATTE;

export default async function Home() {

  return (
    <IframeCustom url={PAGE_INIT_LATTE ?? ""} />
  )
}
