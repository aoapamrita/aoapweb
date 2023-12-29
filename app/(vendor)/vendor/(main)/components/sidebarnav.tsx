import ProfileMenu from "./profilemenu";
import DesktopNav from "./desktopnav";
import Hamburger from "./hamburger";
import MobileNav from "./mobilenav";

export default function SideBarTwoColumn({ children, user }) {
  return (
    <>
      <div>
        <MobileNav />
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <DesktopNav />
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Hamburger />
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex-1"></div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <ProfileMenu user={user} />
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
