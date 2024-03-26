import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /** Update state so the next render will show the fallback UI. */
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  }

  /** You can render any custom fallback UI */
  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          <p>There was an issue parsing your params schema.</p>
          <p>The following error was encountered:</p>
          <pre
            style={{
              fontSize: '11px',
              padding: '3px 5px',
              background: '#D2DDF7',
              border: 'solid 1px #9AADD9',
              fontFamily: 'monospace',
              borderRadius: '3px',
              m: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              position: 'relative'
            }}
          >{this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
