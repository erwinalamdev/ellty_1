import { useState, useEffect } from 'react'

const pages = ['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6']

interface CheckboxProps {
  checked: boolean
  onChange: () => void
}

function Checkbox({ checked, onChange }: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <div
      className="w-6 h-6 relative cursor-pointer flex-shrink-0"
      onClick={onChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div
        className={`w-[23px] h-[23px] rounded-md border transition-all duration-150 flex items-center justify-center
          ${checked
            ? isPressed
              ? 'border-blue-700'
              : isHovered
                ? 'border-blue-500'
                : 'border-transparent'
            : isPressed
              ? 'bg-stone-200 border-stone-400'
              : isHovered
                ? 'bg-stone-50 border-stone-400'
                : 'bg-white border-stone-300'
          }
        `}
        style={{
          opacity: checked ? 1 : 0.6,
          backgroundColor: checked
            ? isPressed
              ? '#1d4ed8'
              : isHovered
                ? '#3b82f6'
                : '#2469F6'
            : undefined
        }}
      >
        {checked && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 5L5.5 9L12.5 1"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

function Button({ onClick, children }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      className="flex justify-center items-center transition-all duration-150 cursor-pointer"
      style={{
        width: '340px',
        minWidth: '340px',
        height: '40px',
        minHeight: '40px',
        padding: '10px 20px',
        gap: '10px',
        borderRadius: '4px',
        backgroundColor: isPressed
          ? '#E5B91F'
          : isHovered
            ? '#FFD84D'
            : '#FFCE22',
        fontFamily: 'Montserrat',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '130%',
        color: '#1F2128',
        border: 'none',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  )
}

function App() {
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [allPagesChecked, setAllPagesChecked] = useState(false)

  // Sync allPagesChecked with selectedPages
  useEffect(() => {
    setAllPagesChecked(selectedPages.length === pages.length)
  }, [selectedPages])

  const handleAllPagesChange = () => {
    if (allPagesChecked) {
      setSelectedPages([])
    } else {
      setSelectedPages([...pages])
    }
  }

  const handlePageChange = (page: string) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter(p => p !== page))
    } else {
      setSelectedPages([...selectedPages, page])
    }
  }

  const handleDone = () => {
    console.log('Selected pages:', selectedPages)
  }

  const textStyle = {
    fontFamily: 'Montserrat',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '130%',
    color: '#1F2128',
  }

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-8">
      {/* Card Container */}
      <div
        className="bg-white overflow-hidden flex flex-col"
        style={{
          width: '370px',
          minWidth: '370px',
          height: '326px',
          minHeight: '326px',
          borderRadius: '6px',
          border: '1px solid #f4f4f5',
          boxShadow: '0px 8px 15px 0px rgba(20, 20, 20, 0.12), 0px 0px 4px 0px rgba(20, 20, 20, 0.10)',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        {/* All Pages Row */}
        <div
          className="flex justify-between items-center bg-white"
          style={{
            width: '370px',
            height: '42px',
            minWidth: '370px',
            minHeight: '42px',
            padding: '8px 15px 8px 22px',
          }}
        >
          <span style={textStyle}>
            All pages
          </span>
          <Checkbox checked={allPagesChecked} onChange={handleAllPagesChange} />
        </div>

        {/* First Divider */}
        <div
          className="flex justify-center items-center"
          style={{ paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div
            style={{
              width: '370px',
              height: '0.7px',
              backgroundColor: '#d6d3d1',
            }}
          />
        </div>

        {/* Pages List */}
        <div
          className="overflow-y-auto hide-scrollbar"
          style={{
            height: '168px',
          }}
        >
          {pages.map((page) => (
            <div
              key={page}
              className="flex justify-between items-center bg-white"
              style={{
                width: '370px',
                height: '42px',
                padding: '8px 15px 8px 22px',
              }}
            >
              <span style={textStyle}>
                {page}
              </span>
              <Checkbox
                checked={selectedPages.includes(page)}
                onChange={() => handlePageChange(page)}
              />
            </div>
          ))}
        </div>

        {/* Second Divider */}
        <div
          className="flex justify-center items-center"
          style={{ paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div
            style={{
              width: '370px',
              height: '0.7px',
              backgroundColor: '#d6d3d1',
            }}
          />
        </div>

        {/* Done Button Container */}
        <div
          className="flex justify-center items-center bg-white"
          style={{ paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '10px' }}
        >
          <Button onClick={handleDone}>Done</Button>
        </div>
      </div>
    </div>
  )
}

export default App
