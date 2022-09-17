import { useState } from 'react'

import * as download from 'downloadjs'
import * as htmlToImage from 'html-to-image'

import { DEFAULT_OPTIONS } from '../shared/options/DefaultOptions'
import { ReactComponent as SaveIcon } from '.././assets/save.svg'
import { ReactComponent as DownloadIcon } from '.././assets/download.svg'
import Slider from '../components/Slider'
import SidebarItem from '../components/SlideBarItem'

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [options, setOptions] = useState(DEFAULT_OPTIONS)
  const [image, setImage] = useState(null)

  const selectedOption = options[selectedIndex]

  const handleSliderChange = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  const applyFilters = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return {
      filter: filters.join(' '),
      backgroundImage: `url(${image})`,
    }
  }

  const downloadResume = () => {
    htmlToImage.toPng(document.getElementById('image')).then(function (dataUrl) {
      download(dataUrl, `${Date.now()}.png`)
    })
  }

  const handleImage = (event) => {
    const objectUrl = URL.createObjectURL(event.target.files[0])
    setImage(objectUrl)
  }
  return (
    <div className="container">
      {image ? (
        <div className="main-image" style={applyFilters()} id="image" />
      ) : (
        <div className="upload-image">
          <h1>Photoshop Clone</h1>
          <div class="input__wrapper">
            <input
              name="file"
              type="file"
              accept="image/*"
              onChange={handleImage}
              id="input__file"
              className={'input input__file'}
              multiple
            />
            <label for="input__file" className={'input__file-button'}>
              <span className={'input__file-icon-wrapper'}>
                <DownloadIcon className={'input__file-icon'} width="25" />
              </span>
              <span className={'input__file-button-text'}>Выберите файл</span>
            </label>
          </div>
        </div>
      )}
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              icon={option.icon}
              active={index === selectedIndex}
              handleClick={() => setSelectedIndex(index)}
            />
          )
        })}
        <SaveIcon onClick={downloadResume} className="download" width={35} />
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  )
}

export default App
