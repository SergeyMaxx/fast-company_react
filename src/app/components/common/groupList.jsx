import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({items, contentProperty, valueProperty, onItemSelect, selectedItem}) => {
  return (
    !Array.isArray(items)
      ?
      <ul className="list-group">
        {Object.keys(items).map(item => (
          <li
            key={items[item][valueProperty]}
            className={'list-group-item ' + (items[item] === selectedItem ? 'active' : '')}
            onClick={() => onItemSelect(items[item])}
            role="button"
          >
            {items[item][contentProperty]}
          </li>
        ))}
      </ul>
      :
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={'list-group-item ' + (item === selectedItem ? 'active' : '')}
            onClick={() => onItemSelect(item)}
            role="button"
          >
            {item[contentProperty]}
          </li>
        ))}
      </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}

export default GroupList