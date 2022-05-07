import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}
function TweetBoxButtons({Icon}:Props) {
  return (
    <Icon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
    )
}

export default TweetBoxButtons
