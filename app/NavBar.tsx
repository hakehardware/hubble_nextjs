'use client'
import { Container, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiPlanetscale } from 'react-icons/si'
import { useState } from 'react'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { FiMenu } from 'react-icons/fi'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <div className="hidden md:block">
                    <Flex align="center" gap="5">
                        <Link href="/">
                            <SiPlanetscale color="var(--sky-9)" size="2rem" />
                        </Link>
                        <NavLinks />
                    </Flex>
                </div>
                <div className="md:hidden">
                    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                        <CollapsibleTrigger asChild>
                            <button className="p-2">
                                <FiMenu size="1.5rem" aria-label="Toggle Menu" />
                            </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <NavLinks direction="vertical" />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </Container>
        </nav>
    )
}

const NavLinks = ({ direction = 'horizontal' }) => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/', isDisabled: false },
        { label: 'Farmers', href: '/farmers', isDisabled: true },
        { label: 'Containers', href: '/containers', isDisabled: true },
        { label: 'Rewards', href: '/rewards', isDisabled: true },
        { label: 'Explorer', href: '/explorer', isDisabled: true },
    ]

    return (
        <ul className={`flex ${direction === 'vertical' ? 'flex-col space-y-4' : 'space-x-6'}`}>
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        className={classnames({
                            'nav-link': true,
                            '!text-zinc-900': link.href === currentPath,
                            '!text-zinc-300': link.isDisabled,
                            disabled: link.isDisabled,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavBar
