import { NavItem } from "@/types";

export const SITE_NAME = "Supabase & React.js";
export const SITE_DESCRIPTION = "Complete documentation for authentication with Supabase and React.js";

export const NAVIGATION: NavItem[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
  },
  {
    title: "Setup & Configuration",
    items: [
      { title: "Installation", slug: "installation" },
      { title: "Supabase Setup", slug: "setup-supabase" },
      { title: "Environment Variables", slug: "environment-variables" },
      { title: "Project Structure", slug: "project-structure" },
    ],
  },
  {
    title: "Authentication",
    items: [
      { title: "Authentication Context", slug: "authentication-context" },
      { title: "Custom Auth Hook", slug: "custom-auth-hook" },
      { title: "Login Example", slug: "login-example" },
      { title: "Register Example", slug: "register-example" },
      { title: "Google Login", slug: "google-login" },
    ],
  },
  {
    title: "Advanced Topics",
    items: [
      { title: "Private Routes", slug: "private-routes" },
      { title: "Session Persistence", slug: "session-persistence" },
      { title: "Logout Handling", slug: "logout" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Advantages", slug: "advantages" },
      { title: "Conclusion", slug: "conclusion" },
    ],
  },
];

export const DOCS_METADATA = [
  {
    title: "Getting Started",
    description: "Introduction to Supabase authentication with React.js",
    slug: "getting-started",
    order: 1,
  },
  {
    title: "Installation",
    description: "Install and configure required dependencies",
    slug: "installation",
    order: 2,
  },
  {
    title: "Supabase Setup",
    description: "Create and configure your Supabase project",
    slug: "setup-supabase",
    order: 3,
  },
  {
    title: "Environment Variables",
    description: "Configure environment variables for your project",
    slug: "environment-variables",
    order: 4,
  },
  {
    title: "Project Structure",
    description: "Understand the recommended project structure",
    slug: "project-structure",
    order: 5,
  },
  {
    title: "Authentication Context",
    description: "Create a custom authentication context provider",
    slug: "authentication-context",
    order: 6,
  },
  {
    title: "Custom Auth Hook",
    description: "Build a reusable useAuth hook for authentication",
    slug: "custom-auth-hook",
    order: 7,
  },
  {
    title: "Login Example",
    description: "Implement email and password login",
    slug: "login-example",
    order: 8,
  },
  {
    title: "Register Example",
    description: "Create user registration functionality",
    slug: "register-example",
    order: 9,
  },
  {
    title: "Google Login",
    description: "Implement OAuth authentication with Google",
    slug: "google-login",
    order: 10,
  },
  {
    title: "Private Routes",
    description: "Protect routes and components for authenticated users",
    slug: "private-routes",
    order: 11,
  },
  {
    title: "Session Persistence",
    description: "Maintain user sessions across page reloads",
    slug: "session-persistence",
    order: 12,
  },
  {
    title: "Logout",
    description: "Implement proper logout functionality",
    slug: "logout",
    order: 13,
  },
  {
    title: "Advantages",
    description: "Benefits of using Supabase with React.js",
    slug: "advantages",
    order: 14,
  },
  {
    title: "Conclusion",
    description: "Wrap up and next steps",
    slug: "conclusion",
    order: 15,
  },
];
