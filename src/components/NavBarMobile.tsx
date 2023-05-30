"use client";
import Image from "next/image";
import  { useEffect, useRef } from "react";
import styles from "../styles/mobile.module.css";
import { useMobile } from "@/Hooks/useMobile";
import DownloaMyCV from "./DownloaMyCV";
import HireMe from "./HireMe";
import NavBtn from "./NavBtn";
import debounce from "@/utils/debounce";
import Twitter from "./Twitter";
import GitHub from "./GitHub";
import LinkedIn from "./LinkedIn";
import CloseBtn from "./CloseBtn";

type Props = {};

function NavBarMobile({}: Props): React.JSX.Element {
  const mobileWrapperRef = useRef<HTMLElement | null>(null);

  const { toggleMobileMenu, ShowMobileMenu } = useMobile()!;

  /* useEffect(() => {
    if (
      !(mobileWrapperRef.current && mobileWrapperRef.current.addEventListener)
    )
      return;

    const closeMobileMenu = function (e: Event) {
      e.preventDefault()
      e.stopPropagation();
      toggleMobileMenu(false);
    };

    mobileWrapperRef.current.addEventListener("click", closeMobileMenu);

    return () => {
      if (
        !(mobileWrapperRef.current && mobileWrapperRef.current.addEventListener)
      )
        return;
      mobileWrapperRef.current.removeEventListener("click", closeMobileMenu);
    };
  }, [mobileWrapperRef]); */

  /* function onResizeHandler(e: Event) {
    //console.log("resized");
    toggleMobileMenu(false);
  }*/

  /**
   *  to close the navbar mobile when the size is more than the default one
   */
  useEffect(() => {
    const resizeHandlerDebounced = debounce(() => {
      if (window.innerWidth >= 690 && ShowMobileMenu) {
        return toggleMobileMenu(false);
      }
    }, 200);

    window.addEventListener("resize", resizeHandlerDebounced);

    return () => {
      window.removeEventListener("resize", resizeHandlerDebounced);
    };
  }, []);

  return (
    <section
      className={`${ShowMobileMenu ? styles["show_mobile_menu"] : ""} 
      ${styles.mobile_wrap}`}
      ref={mobileWrapperRef}
    >
      <section className={styles.mobile_container}>
        <section className={styles.mobile_container_head}>
          <Image
            src={"/logos/ivan01-tech-png.png"}
            width={100}
            height={30}
            alt="Ivan01-tech logo"
            priority
          />
          <div>
            {/* the button to add dark mode later */}
            {/* <ThemeBtn>
              <BsFillSunFill />
            </ThemeBtn> */}
            <button
              className={styles.mobile_close_btn}
              onClick={(e) => {
                // e.stopPropagation();
                toggleMobileMenu(false);
              }}
            >
              <CloseBtn />
            </button>
          </div>
        </section>

        <nav className={styles.mobile_nav}>
          <ul>
            <li>
              <NavBtn shouldCallToggle linkId="home_banner">
                Accueil
              </NavBtn>
            </li>
            <li>
              <NavBtn shouldCallToggle linkId="skills">
                Skills
              </NavBtn>
            </li>
            <li>
              <NavBtn shouldCallToggle linkId="projects">
                Portfolio
              </NavBtn>
            </li>
          </ul>
        </nav>

        <div className={styles.nav_btn}>
          <DownloaMyCV />
          <HireMe />
        </div>

        <section className={styles.follow_btn}>
          <Twitter />
          <GitHub />
          <LinkedIn />
        </section>
      </section>
    </section>
  );
}

export default NavBarMobile;
