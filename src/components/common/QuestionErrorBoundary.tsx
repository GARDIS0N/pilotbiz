import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  questionId: string;
  language?: 'en' | 'sw';
  onSkip: () => void;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class QuestionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      `[Content Integrity] QuestionErrorBoundary caught runtime error on question ${this.props.questionId}:`,
      error,
      errorInfo
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.questionId !== this.props.questionId && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      const isSw = this.props.language === 'sw';
      return (
        <div className="p-6 rounded-3xl bg-amber-950/40 border-2 border-amber-500/50 text-center space-y-4 my-4 animate-fade-in max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-900/60 border border-amber-500/60 flex items-center justify-center text-3xl">
            🦉
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-white">
              {isSw ? 'Hebu tujaribu swali lifuatalo' : "Let's try the next one"}
            </h4>
            <p className="text-xs text-amber-200/90 font-medium max-w-sm mx-auto">
              {isSw
                ? 'Kuna hitilafu ndogo kwenye swali hili. Hakuna shida, safari ya elimu inaendelea!'
                : 'A small issue was detected with this question. No problem at all, moving right ahead!'}
            </p>
          </div>
          <button
            type="button"
            onClick={this.props.onSkip}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl cursor-pointer min-h-[48px]"
          >
            {isSw ? 'SWALI LIFUATALO ➔' : 'NEXT QUESTION ➔'}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
