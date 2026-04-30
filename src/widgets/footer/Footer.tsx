export function Footer() {
  return (
    <footer className="grid-layout text-xs py-10 flex flex-col gap-2 bg-[#171717] pt-20">
      <div className="layout-center border-t pt-10 border-zinc-50/5">
        <p className="leading-6 my-3 opacity-75">
          게시물은 상업적 목적이 아닌 포트폴리오 목적으로만 사용됩니다. <br/>
          아직 공개되지 않은 작업물은 포함하지 않으며, 오직 공개된 작업물만을 게시합니다.
        </p>

        <p style={{ marginTop: "20px" }}>Copyright ⓒ p. sunghun 2026</p>
      </div>
    </footer>
  );
}
