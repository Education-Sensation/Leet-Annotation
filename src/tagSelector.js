import React from "react";

export default function TagSelector(props) {
    console.log(props.tagList); // empty array

    let options;
    
    // populate array of option tags
    props.tagList.forEach((tagObject) => {
        console.log('making <option> for ', tagObject.text, ' with id ', tagObject.id);
        options.push(<option key={tagObject.id}>{tagObject.text}</option>);
    });

    return <select multiple={true}>{options}</select>;
}
