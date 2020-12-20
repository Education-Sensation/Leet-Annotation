import React from "react";

export default class TagSelector extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        console.log(this.props.tagList); // array of 4 empty objects followed by the correct 4 objects

        let options = new Array(this.props.tagList.length);
        
        // populate array of option tags
        this.props.tagList.forEach((tagObject) => {
            console.log('making <option> for ', tagObject.text, ' with id ', tagObject.id);
            options.push(<option key={tagObject.id}>{tagObject.text}</option>);
        });
    
        return <select multiple={true}>{options}</select>;    
    }
}
