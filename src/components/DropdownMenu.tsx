import {useRef, useEffect, useState} from "react"

interface DropdownMenuProps {
    color: string,
    BGColor: string
}

export default function DropdownMenu({color, BGColor}: DropdownMenuProps) {

    const [menuIsOpen, setMenuIsOpen] = useState(false)
    // very stupid. pathname must be initialized on mount, must persist across renders, and must be scoped 
    // regular vars to my knowledge ref values should do the trick. I should turn component into astro component
    // using vanilla JS with a class that adds `display: none` styling would probably be much better 
    const pathname = useRef<string | null>(null);
    const menuRef = useRef(null);


    useEffect(() => {
        document.addEventListener("click",(event)=>{ 
            const thisTarget = event.target as HTMLElement;
            if (thisTarget){
                // if clicked inside main navbar element. do nothing.
                if (thisTarget.closest(".menu") || thisTarget.closest(".menu-button") ) {} 
                // if clicked outside main navbar element. close it via toggling
                else setMenuIsOpen(false)
                
            }
        });

        window.addEventListener("scroll", () => {
            setMenuIsOpen(false)
        })


        pathname.current = window.location.pathname;
        // pathname = pathname[subpath.length - 1]
        let subpath = pathname.current.match(/[^\/]+/g) ?? "";

        if (subpath !== "") subpath = subpath
    }, [])


    return ( 
    <>
        <div className="">
            <button onClick={() => {setMenuIsOpen(menuIsOpen => !menuIsOpen)}} className="menu-button ">
                <svg className={"duration-200 \
                hover:shadow-[0_0_0_0.1rem_rgba(0_0_0_/_5%)] hover:bg-[rgb(0_0_0_/_5%)] focus-within:shadow-[0_0_0_0.1rem_rgba(0_0_0_/_5%)] \
                focus-within:bg-[rgb(0_0_0_/_5%)] " + "fill-" + color}
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 
                    0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 
                    2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </button>
            {
                menuIsOpen &&
                <div className={"absolute right-0 flex flex-col internal-links justify-center gap-5 p-3 rounded-l-md shadow-[0px_0px_3px_1px_rgba(0,0,0,0.10)] menu " + "bg-" + BGColor}>
                    <a href="/" color={color} 
                    className={("/" === pathname.current) ? "underline" : "" }>Home </a>
                    <a href="/AboutMe" color={BGColor}
                    className={("/AboutMe" === pathname.current) ? "underline" : "" }>About</a>
                    <a href="/Writings" color={color}
                    className={("/Writings" === pathname.current) ? "underline" : "" }>Writings</a>
                    <a href="/Portfolio" color={color}
                    className={("/Portfolio" === pathname.current) ? "underline" : "" }>Portfolio</a>
                    <div className="flex gap-3"> 
                        <a href="https://m.webtoo.ls/@astro" target="_blank">
                            <svg className={"fill-" + color } viewBox="0 0 16 16" aria-hidden="true" width="24" height="24">
                                <path
                                    d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 
                                    10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 
                                    3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 
                                    3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 
                                    1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046.456-.505 1.052-.764 
                                    1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764.442.505.661 1.187.661 2.046v4.203z">
                                </path>
                            </svg>
                        </a>
                        <a href="https://x.com/AsianTroglodtye" target="_blank">
                            <svg className={"fill-" + color } viewBox="0 0 16 16" aria-hidden="true" width="24" height="24">
                                <path
                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 
                                    1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 
                                    3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 
                                    2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">
                                </path>
                            </svg>
                        </a>
                        <a href="https://github.com/AsianTroglodyte" target="_blank">
                            <svg className={"fill-" + color} viewBox="0 0 16 16" aria-hidden="true" width="24" height="24">
                                <path
                                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
                                    1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 
                                    0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 
                                    3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            }
        </div>
    </>)
}



