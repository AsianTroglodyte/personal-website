import {useRef, useEffect, useState} from "react"

interface DropdownMenuProps {
    color: string,
}

export default function DropdownMenu({color}: DropdownMenuProps) {

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    // very stupid. pathname must persist across renders, and must be scoped regular vars 
    // to my knowledge ref values should do the trick. I should turn component into astro component
    const pathname = useRef<string | null>(null);


    useEffect(() => {
        document.addEventListener("click",(event)=>{ 
            const thisTarget = event.target as HTMLElement;
            if (thisTarget){
                if (thisTarget.closest(".menu") || thisTarget.closest(".menu-button") ) {
                    // if clicked inside main navbar element. do nothing.
                    console.log("inside")
                } 
                else {
                    // if clicked outside main navbar element. close it via toggling
                    console.log("outside")
                    setMenuIsOpen(false)
                }
            }
        });
        
        pathname.current = window.location.pathname;
        // pathname = pathname[subpath.length - 1]
        // not very pretty. should work on
        let subpath = pathname.current.match(/[^\/]+/g) ?? "";

        if (subpath !== "") subpath = subpath
        console.log("pathname: " + pathname + "\n" + "subpath: " + subpath);

    }, [])

    return ( 
    <>
        <div className="">
            <button onClick={() => {setMenuIsOpen(menuIsOpen => !menuIsOpen)}} className="menu-button ">
                <svg className="duration-200 
                hover:shadow-[0_0_0_0.1rem_rgba(0_0_0_/_5%)] hover:bg-[rgb(0_0_0_/_5%)] focus-within:shadow-[0_0_0_0.1rem_rgba(0_0_0_/_5%)] focus-within:bg-[rgb(0_0_0_/_5%)]" 
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 
                    0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 
                    2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </button>
            {
                menuIsOpen &&
                <div className={ menuIsOpen 
                ? "absolute right-0 flex flex-col internal-links justify-center gap-5 p-3 rounded-l-md bg-PWWhite menu "
                : "absolute right-0 flex flex-col internal-links justify-center gap-5 p-3 rounded-l-md bg-PWWhite menu "}>
                    <a href="/" color={color} 
                    className={("/" === pathname.current) ? "underline" : "" }>Home </a>
                    <a href="/AboutMe" color={color}
                    className={("/AboutMe" === pathname.current) ? "underline" : "" }>About</a>
                    <a href="/Writings" color={color}
                    className={("/Writings" === pathname.current) ? "underline" : "" }>Writings</a>
                    <a href="/Portfolio" color={color}
                    className={("/Portfolio" === pathname.current) ? "underline" : "" }>Portfolio</a>
                </div>
            }
        </div>
    </>)
}



