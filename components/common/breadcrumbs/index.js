import ActiveLink from "../link";


export default function Breadcrumbs({items}) {

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
      { items.map((item, i) =>
          <li
            key={item.href}
            className={`${i == 0 ? "pr-4" : "px-4"} font-medium text-gray-500 hover:text-gray-900`}>
              {/* we will pass our href and it's value in ActiveLink component */}
            <ActiveLink href={item.href} > 
              <a >
                {item.value}
              </a>
            </ActiveLink>
          </li>
        )}
      </ol>
    </nav>
  )
}