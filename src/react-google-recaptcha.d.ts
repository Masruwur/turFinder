declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  interface ReCAPTCHAProps {
    sitekey: string;
    size?: 'compact' | 'normal' | 'invisible';
    theme?: 'light' | 'dark';
    type?: 'image' | 'audio';
    tabindex?: number;
    onChange?: (value: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {}
}
