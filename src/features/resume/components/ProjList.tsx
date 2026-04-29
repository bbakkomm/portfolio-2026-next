interface ProjItem {
  name: string;
  desc?: string;
  link?: { href: string; label: string };
  showArrow?: boolean;
}

interface ProjListProps {
  items: ProjItem[];
  className?: string;
}

const ProjList = ({ items, className }: ProjListProps) => (
  <ul className={`list-none p-0 m-0 ${className ?? ""}`}>
    {items.map((item, i) => (
      <li
        key={i}
        className="relative pl-[18px] py-2.5 before:content-[''] before:absolute before:left-0 before:top-[22px] before:size-[5px] before:rounded-full before:bg-zinc-300"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px] text-zinc-50">{item.name}</span>
        </div>
        {item.desc && (
          <div className="text-[13.5px] text-zinc-400 mt-1 leading-[1.7]">{item.desc}</div>
        )}
        {item.link && (
          <div className="text-[13.5px] text-zinc-400 mt-1 leading-[1.7]">
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 border-b border-dashed border-zinc-700 hover:text-pink-400 hover:border-pink-400 transition-colors"
            >
              {item.link.label}
            </a>
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default ProjList;
