import React, { useState } from 'react';
import { AlertCircle, ExternalLink, Copy, Check, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';

interface UnauthorizedDomainAlertProps {
  onDismiss?: () => void;
  onPreviewLogin?: () => void;
  previewLabel?: string;
  previewDescription?: string;
}

export default function UnauthorizedDomainAlert({
  onDismiss,
  onPreviewLogin,
  previewLabel = "Continue in Preview / Demo Mode",
  previewDescription = "Log in instantly with full access while in this development preview environment."
}: UnauthorizedDomainAlertProps) {
  const [copied, setCopied] = useState(false);
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const projectId = firebaseConfig.projectId || 'gen-lang-client-0026405485';
  const consoleAuthUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;

  const handleCopy = () => {
    if (navigator.clipboard && currentHostname) {
      navigator.clipboard.writeText(currentHostname);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5 md:p-6 text-left my-4 shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
              Firebase Auth: Domain Not Authorized
            </h3>
            {onDismiss && (
              <button 
                onClick={onDismiss}
                className="text-xs text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200 underline font-medium"
              >
                Dismiss
              </button>
            )}
          </div>
          <p className="text-xs text-amber-800/90 dark:text-amber-300/90 mt-1.5 leading-relaxed">
            Google Firebase OAuth requires this preview hosting domain to be added to your Firebase project’s <strong>Authorized domains</strong> list.
          </p>

          {/* Domain Box */}
          <div className="mt-3.5 bg-white/80 dark:bg-black/40 border border-amber-500/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">
                Current Domain to Authorize:
              </span>
              <code className="text-xs font-mono font-bold text-amber-950 dark:text-amber-100 break-all select-all">
                {currentHostname}
              </code>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition shadow-sm shrink-0"
            >
              {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy Domain'}</span>
            </button>
          </div>

          {/* Quick Steps */}
          <div className="mt-3.5 space-y-1.5 text-[11px] text-amber-900/80 dark:text-amber-200/80">
            <div className="font-semibold text-amber-950 dark:text-amber-100">To authorize this domain permanently:</div>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-xs leading-relaxed">
              <li>
                Open the{' '}
                <a 
                  href={consoleAuthUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold underline text-amber-900 dark:text-amber-100 hover:text-wine inline-flex items-center gap-0.5"
                >
                  Firebase Auth Settings <ExternalLink size={11} className="inline" />
                </a>
              </li>
              <li>Scroll down to the <strong>Authorized domains</strong> section and click <strong>Add domain</strong></li>
              <li>Paste <code className="bg-amber-200/50 dark:bg-amber-900/40 px-1 py-0.5 rounded font-mono text-[11px]">{currentHostname}</code> (or <code className="bg-amber-200/50 dark:bg-amber-900/40 px-1 py-0.5 rounded font-mono text-[11px]">run.app</code>) and save.</li>
            </ol>
          </div>

          {/* Quick bypass action for preview */}
          {onPreviewLogin && (
            <div className="mt-4 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-amber-800/80 dark:text-amber-300/80">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-500" /> Instant Testing Option
                </span>
                <span>{previewDescription}</span>
              </div>
              <button
                type="button"
                onClick={onPreviewLogin}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-wine hover:bg-wine-light text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition shrink-0"
              >
                <span>{previewLabel}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
