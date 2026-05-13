interface SubItem {
  name: string;
  desc?: string;
}

interface ProjItem {
  name: string;
  desc?: string;
  link?: { href: string; label: string };
  showArrow?: boolean;
  subItems?: SubItem[];
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
          <span className="font-semibold text-[17px] text-zinc-50">{item.name}</span>
        </div>
        {item.desc && (
          <div className="text-[15.5px] text-zinc-400 mt-1 leading-[1.7]">{item.desc}</div>
        )}
        {item.subItems && item.subItems.length > 0 && (
          <ul className="list-none p-0 m-0 mt-2 ml-3 space-y-1.5">
            {item.subItems.map((sub, si) => (
              <li key={si} className="grid grid-cols-[8px_1fr] gap-x-2">
                <span className="self-center justify-self-center size-0.75 rounded-full bg-zinc-600" />
                <span className="text-[14.5px] font-medium text-zinc-300 leading-normal">{sub.name}</span>
                {sub.desc && (
                  <div className="col-start-2 text-[13.5px] text-zinc-500 mt-0.5 leading-[1.6]">{sub.desc}</div>
                )}
              </li>
            ))}
          </ul>
        )}
        {item.link && (
          <div className="mt-2">
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-pink-400/60 border-b border-dashed border-pink-400/40 hover:text-pink-400 hover:border-pink-400 transition-colors"
            >
              {item.link.label} ↗
            </a>
          </div>
        )}
      </li>
    ))}
  </ul>
);

export default ProjList;
