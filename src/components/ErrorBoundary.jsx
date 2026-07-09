import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center py-24 text-center">
          <p className="eyebrow-boxed mb-6">Error</p>
          <h1 className="display text-4xl md:text-5xl">
            Something <span className="text-brand">broke.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-ink/50">
            An unexpected error occurred. A reload usually fixes it.
          </p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-8">
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}