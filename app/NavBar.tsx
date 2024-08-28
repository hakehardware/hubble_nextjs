'use client'
import { Container, Flex } from '@radix-ui/themes'
import classnames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiPlanetscale } from 'react-icons/si'

const NavBar = () => {
    return (
        <nav className=" border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <SiPlanetscale size="2rem" />
                        </Link>
                        <NavLinks />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/', isDisabled: false },
        { label: 'Farmers', href: '/farmers', isDisabled: true },
        { label: 'Containers', href: '/containers', isDisabled: true },
        { label: 'Rewards', href: '/rewards', isDisabled: true },
        { label: 'Explorer', href: '/explorer', isDisabled: true },
    ]

    return (
        <ul className="flex space-x-6">
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
