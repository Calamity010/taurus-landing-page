import { motion } from 'framer-motion';
import { Globe, CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const leaveEntitlements = [
  { type: 'Casual Leave', days: '12 Days' },
  { type: 'Sick Leave', days: '3 Days' },
  { type: 'Maternity Leave', days: 'As per Law' },
  { type: 'Paternity Leave', days: '5 Days' },
];

const LeavePolicyPage = () => {
  return (
    <div className="min-h-screen bg-background font-sans pt-20">
      {/* Hero */}
      <section className="bg-background border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-bold mb-6 border border-blue-500/20">
            <Globe size={14} />
            Knowledge Bank
          </div>
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/resources/policies" className="hover:text-white transition-colors">Policies</Link>
            <ChevronRight size={14} />
            <span className="text-white">Leave Policy</span>
          </nav>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <CalendarDays className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Leave Policy</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This policy provides employees with adequate rest, personal time, and statutory leave benefits in compliance with applicable labor laws.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* 1. Purpose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">1</span>
              Purpose
            </h2>
            <p className="text-slate-300 leading-relaxed">
              To provide employees with adequate rest, personal time, and statutory leave benefits.
            </p>
          </motion.div>

          {/* 2. Leave Entitlements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">2</span>
              Leave Entitlements
            </h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-6 py-3 text-slate-300 font-semibold text-sm">Leave Type</th>
                    <th className="text-left px-6 py-3 text-slate-300 font-semibold text-sm">Entitlement</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveEntitlements.map((leave, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 text-slate-300">{leave.type}</td>
                      <td className="px-6 py-4 text-blue-400 font-semibold">{leave.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* 3. Leave Accrual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">3</span>
              Leave Accrual
            </h2>
            <ul className="space-y-2">
              {['Earned Leave accrues monthly.', 'Unused CL can be carried forward (limit applies).'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. Sick Leave Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.21 }}
            className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">4</span>
              Sick Leave Policy
            </h2>
            <ul className="space-y-2">
              {['Medical certificate required for leave exceeding 2 days.', 'HR may verify in case of extended absence.'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 5. Unauthorized Absence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="bg-card rounded-2xl border border-white/10 p-8 hover:border-blue-500/30 transition-all"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">5</span>
              Unauthorized Absence
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Absence without approval for 3 consecutive days may be treated as voluntary abandonment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-center text-white mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Have Questions About Our Policies?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Reach out to HR for clarifications or to report any violations confidentially.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Contact HR <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LeavePolicyPage;
