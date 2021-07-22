const SubHeaderComponent = (props) => {
    return (
        <div className="d-flex">
            <button className={props.action.className} onClick={props.action.uri}>{props.action.title}</button>
            <input placeholder="Ara" onChange={props.filter} style={{flex:1}} type="text" className="form-control ms-2" />
        </div>
    )
}

export default SubHeaderComponent;