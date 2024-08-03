const Tag = (props) => {
    return (
        <>
            <div className="border-radius-5 py-1 px-2 bg-PWBlack text-PWWhite text-xs rounded-xl w-fit max-w-32"
            key={props.tagData.id}>
                <p className="truncate">
                    {props.tagData.tagName}
                </p>
            </div>
        </>
    )
}


export default Tag;