interface CopySVGProps {
  classNameBtn?: string
  classNameSVG?: string
  onMouseDown?: () => void
}

export function CopySVG({ classNameBtn, classNameSVG, onMouseDown }: CopySVGProps) {
  return (
    <button aria-label='Copy Text' className={classNameBtn}>
      <svg
        aria-hidden
        className={classNameSVG}
        fill='#000000'
        onMouseDown={onMouseDown}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 352.804 352.804'
        xmlSpace='preserve'
      >
        <g></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g>
          {' '}
          <g>
            {' '}
            <path d='M318.54,57.282h-47.652V15c0-8.284-6.716-15-15-15H34.264c-8.284,0-15,6.716-15,15v265.522c0,8.284,6.716,15,15,15h47.651 v42.281c0,8.284,6.716,15,15,15H318.54c8.284,0,15-6.716,15-15V72.282C333.54,63.998,326.824,57.282,318.54,57.282z M49.264,265.522V30h191.623v27.282H96.916c-8.284,0-15,6.716-15,15v193.24H49.264z M303.54,322.804H111.916V87.282H303.54V322.804 z'></path>{' '}
          </g>{' '}
        </g>
      </svg>
    </button>
  )
}
