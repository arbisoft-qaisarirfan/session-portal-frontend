import CssBaseline from "@mui/material/CssBaseline";
import { type Preview } from "@storybook/nextjs-vite";

import ThemeProvider from "@/components/theme/theme-provider";
import { Providers } from "@/redux/store/provider";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <Providers>
          <ThemeProvider>
            <CssBaseline />
            <Story />
          </ThemeProvider>
        </Providers>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
};

export default preview;
