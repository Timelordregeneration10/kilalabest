import StickyLayout from "./providers/stickyProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <StickyLayout>{children}</StickyLayout>;
};

export default Layout;
