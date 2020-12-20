import React from "react";

// Return an array of the selected opion values
// select is an HTML select element
function getSelectValues(selectElement) {
    var result = [];
    var options = selectElement && selectElement.options;
    var option;
  
    for (var i = 0, iLen = options.length; i < iLen; i++) {
      option = options[i];
  
      if (option.selected) {
        result.push(option.value || option.text);
      }
    }
    return result;
  }
  
export default class TagSelector extends React.Component {
    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(event) {
        const selectedTagValues = getSelectValues(event.target);

        console.log('selected ', selectedTagValues, '. Adding them to parent form state');
        this.props.onTagSelect(selectedTagValues);
    }

    render() {
        console.log(this.props.tagList); // array of 4 empty objects followed by the correct 4 objects

        let options = new Array(this.props.tagList.length);
        
        // populate array of option tags
        this.props.tagList.forEach((tagObject) => {
            console.log('making <option> for ', tagObject.text, ' with id ', tagObject.id);
            options.push(<option key={tagObject.id}>{tagObject.text}</option>);
        });
    
        return <select multiple={true} onChange={this.onSelect}>{options}</select>;    
    }
}
