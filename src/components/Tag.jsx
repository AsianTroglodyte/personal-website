const Tag = (props) => {
    return (
        <>
            <div className="border-radius-5 h-[1.65rem] py-1 px-2 bg-PWBlack text-PWWhite text-xs rounded-xl w-fit max-w-32 grow-0 shrink-0"
            key={props.tagData.id}>
                <p className="truncate min">
                    {props.tagData.tagName}
                </p>
            </div>
        </>
    )
}


export default Tag;