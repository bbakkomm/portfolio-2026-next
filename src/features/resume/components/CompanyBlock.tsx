interface CompanyBlockProps {
  company: string;
  meta: string;
  role?: string;
  stack?: string;
}

const CompanyBlock = ({ company, meta, role, stack }: CompanyBlockProps) => (
  <div className="mb-2">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
      <h2 className="text-[24px] font-bold tracking-[-0.018em] text-zinc-50 m-0">
        {company}
      </h2>
      <span className="text-[14.5px] font-medium text-zinc-500 tracking-[0.01em]">
        {meta}
      </span>
    </div>
    {(role || stack) && (
      <p className="text-[15.5px] text-zinc-400 mb-6">
        {role}
        {role && stack && <span className="mx-2 text-zinc-600">·</span>}
        {stack}
      </p>
    )}
  </div>
);

export default CompanyBlock;
