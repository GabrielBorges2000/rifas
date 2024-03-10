import React, { ReactNode } from 'react'
import clsx from 'clsx'

export interface SectionProps {
  title: string
  description?: string
  children?: ReactNode
  icon?: ReactNode
}

export default function Section({
  title,
  description,
  icon,
  children,
}: SectionProps) {
  return (
    <div
      className={clsx('w-full mt-10 gap-10', {
        'flex justify-start': children && React.Children.count(children) === 1,
      })}
    >
      <section className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 md:ml-8 items-center">
          {icon}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <p className="text-muted-foreground md:ml-9">{description}</p>

        <div className="w-full flex flex-col gap-4 md:flex-wrap md:flex-row justify-evenly">
          {children}
        </div>
      </section>
    </div>
  )
}
