// import { ClassValue } from 'clsx'

import { cn } from '../lib/utils'

export default function LocationInput(props) {
  return (
    <input
      className={cn(
        'rounded-base border-2 border-black p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 outline-none transition-all',
        props.className,
      )}
      type="text"
      name="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        props.setValue(e.target.value)
      }}
      aria-label={props.placeholder}
    />
  )
}