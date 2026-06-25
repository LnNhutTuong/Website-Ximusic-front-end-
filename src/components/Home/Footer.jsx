const Footer = () => {
  return (
    <div className="w-86 h-[calc(100%-700px)] bg-slate-600/50 rounded-xl overflow-y-auto text-white p-4 font-sans select-none scrollbar-thin">
      {/* Toàn bộ nội dung xếp dọc xuống */}
      <div className="flex flex-col gap-4 text-left">
        {/* Cột 1 */}
        <div className="border-b border-slate-500/20 pb-2">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
            Về Chúng Tôi
          </h3>
          <p className="text-[11px] text-slate-400 leading-normal">
            Footer siêu tốc giải cứu ngày lười biếng cho dự án XiMusic.
          </p>
        </div>

        {/* Cột 2 */}
        <div className="border-b border-slate-500/20 pb-2">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
            Liên Kết
          </h3>
          <ul className="text-[11px] text-slate-400 space-y-1.5">
            <li>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors block"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors block"
              >
                Dịch vụ
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
            Liên Hệ
          </h3>
          <p className="text-[11px] text-slate-400">Email: support@abc.com</p>
        </div>
      </div>

      {/* Bản quyền phía dưới */}
      <div className="mt-5 pt-2 border-t border-slate-500/30 text-center text-[10px] text-slate-500">
        <p>&copy; 2026 XiMusic.</p>
      </div>
    </div>
  );
};
export default Footer;
