# HR Employee Management System

> **Note**: This `README.md` was generated with the help of AI and will be updated later once the application is fully developed.

Lightweight HR & Employee Management System built with Laravel (backend), React + Inertia (frontend), and MySQL. This repository will host features for HR staff, employees and guest users to manage memos, applicants, timekeeping, payroll, leaves, complaints and appointments.

## Goals & high-level flow

- Support three primary user roles: HR, Employee and Guest (outsider). Login routes should route to role-appropriate landing pages.
- HR users can manage memos, review applicants (approve/decline), handle timekeeping and payroll, approve/decline leave requests, and view reports.
- Employees can submit leave requests, complaints, view payroll/pay stubs and their attendance/leave history.
- Guests can contact HR or request appointments and optionally upload a CV/resume.

## Tech stack

- Backend: Laravel (PHP)
- Frontend: React with Inertia.js (single-page feel, server-driven routing)
- Database: MySQL
- UI: Tailwind CSS + shadcn UI components (Radix + Tailwind) and Lucide icons (React).
- Mail & Queue: Laravel Mailables and queue (database/Redis) for appointment and applicant confirmation emails
- Dev tools: Vite for bundling, PHPUnit for tests

## High-level feature list (from requirements)

- General UI: route/sift users to HR dashboard, Employee landing page, or Guest contact/login
- HR Staff features
    - Send memo (input form). Model: Memo.php
    - Applicant queue (table view, separate page). Per applicant: Name, email, date sent, view details, delete. One-week auto-clean option. Model: Applicant.php
    - Timekeeping: record time-in / time-out, late flags, table view. Model: Timekeeping.php
    - Overtime handling and payroll integration. Model: Payroll.php
    - Approve/decline leaves (with mandatory rules for maternity/paternity). Leave history and tracking. Model: Leave.php
    - Salary calculation based on attendance, overtime, and deductions (tardiness, taxes by percentage). Payroll computation page and employee-facing payroll tab. Model: Payroll.php
    - Optional: handle complaints from employees (Complaint.php)
    - Notifications: resignation triggers HR notification (30 days)

- Employee features
    - Submit leave requests (dropdown of types: special, emergency, personal, sick, paternity (7 days mandatory), maternity (105 days mandatory)), view remaining leaves (sick/personal allocation e.g., 15 days each per year)
    - Submit complaints/concerns
    - View payroll, pay computations, and attendance records
    - Resignation submission (optional) which notifies HR

- Guest features
    - Contact HR form (simple input -> opens Gmail or sends using configured mail driver)
    - Request appointment (sends confirmation email to applicant and HR; CV/resume upload optional)

## Recommended data models (DB tables)

Below are suggested Eloquent model names and core attributes. Implement as needed and expand with relations and indices.

- users (User.php)
    - id, name, email, password, role (enum: hr|employee|guest), position, hired_at, created_at, updated_at

- memos (Memo.php)
    - id, hr_id (user), subject, body, sent_at, created_at, updated_at

- applicants (Applicant.php)
    - id, name, email, phone, cv_path (nullable), applied_at, status (pending|accepted|rejected), hr_notes, created_at, updated_at

- timekeepings (Timekeeping.php)
    - id, user_id, date, time_in, time_out, late_minutes, overtime_minutes, notes, created_at, updated_at

- leaves (Leave.php)
    - id, user_id, type, start_date, end_date, days, status (pending|approved|declined), reason, created_at, updated_at

- payrolls (Payroll.php)
    - id, user_id, period_start, period_end, base_salary, overtime_pay, deductions, tax_percentage, net_pay, created_at, updated_at

- complaints (Complaint.php)
    - id, user_id, type, subject, description, status, created_at, updated_at

- appointments (Appointment.php)
    - id, name, email, scheduled_at, hr_assignee_id, status, notes, created_at, updated_at

- resignations (Resignation.php)
    - id, user_id, notice_date, effective_date, reason, created_at, updated_at

Notes: add pivot tables for many-to-many relationships if needed. Use soft deletes where applicable.

## Routes and file map (suggested)

- web.php (routes)
    - /login, /logout
    - /hr/\* -> HR dashboard routes (memos, applicants, timekeeping, payroll, leaves)
    - /employee/\* -> Employee landing and features (leave request, payroll view)
    - /guest/\* -> Contact, appointment, resume upload

- Controllers (Laravel)
    - app/Http/Controllers/AuthController.php (login/logout)
    - app/Http/Controllers/HR/MemoController.php
    - app/Http/Controllers/HR/ApplicantController.php
    - app/Http/Controllers/HR/TimekeepingController.php
    - app/Http/Controllers/HR/PayrollController.php
    - app/Http/Controllers/HR/LeaveController.php
    - app/Http/Controllers/Employee/RequestController.php
    - app/Http/Controllers/Guest/AppointmentController.php

- Models
    - app/Models/User.php
    - app/Models/Memo.php
    - app/Models/Applicant.php
    - app/Models/Timekeeping.php
    - app/Models/Leave.php
    - app/Models/Payroll.php
    - app/Models/Complaint.php

- Frontend (React + Inertia)
    - resources/js/Pages/HR/Dashboard.jsx
    - resources/js/Pages/HR/Applicants.jsx
    - resources/js/Pages/HR/Memos/NewMemo.jsx
    - resources/js/Pages/HR/Timekeeping.jsx
    - resources/js/Pages/HR/Payroll.jsx
    - resources/js/Pages/Employee/Landing.jsx
    - resources/js/Pages/Employee/Payroll.jsx
    - resources/js/Pages/Guest/Contact.jsx
    - resources/js/layouts/\* (shared page layouts and wrappers)
    - resources/js/components/\* (shared UI components)

## Business rules / acceptance notes

- Leave rules: paternity (7 days mandatory), maternity (105 days mandatory). Configure automatic approvals for statutory leaves or require HR approval depending on policy.
- Leave balances: track annual allocations (e.g. sick = 15 days, personal = 15 days) and decrement when leaves are approved.
- Applicant queue: HR can accept manually or enable automatic confirmation emails when state transitions to accepted.
- Payroll: compute base salary pro-rated by attendance, add overtime, then deduct tardiness penalties and taxes (percentage). Allow optional bonuses (e.g., 2x multiplier for specific types).

## Setup & development (local)

Prerequisites:

- PHP 8.1+ with required extensions
- Composer
- Node.js 18+ and npm or yarn
- MySQL

Basic steps:

1. Install PHP dependencies

```bash
composer install
```

2. Copy environment and set DB + mail credentials

```bash
cp .env.example .env
# Edit .env and set DB_DATABASE, DB_USERNAME, DB_PASSWORD, MAIL_* values
php artisan key:generate
```

3. Run migrations & seeders

```bash
php artisan migrate --seed
```

4. Install frontend deps and run Vite dev server

```bash
npm install
npm run dev
```

5. Serve the app

```bash
php artisan serve
# or use your preferred local server (Valet, Sail, Docker)
```

Optional: set up queues for mail (database/redis) and cron jobs for automated cleanup (e.g., delete applicants older than 1 week) and scheduled payroll runs.

## Tests

- Unit and Feature tests are handled via PHPUnit. Example:

```bash
./vendor/bin/phpunit
```

Create tests for: payroll computation (edge cases: 0 hours, overtime only), leave balance updates, applicant acceptance email, timekeeping late detection.

## Security & privacy notes

- Store uploaded resumes in a private storage disk and only expose downloads to authorized HR users.
- Hash passwords (Laravel does this by default). Protect routes with role-based middleware.
- Sanitize and validate all user inputs, especially file uploads.

## Next steps (suggested implementation plan)

1. Scaffold models, migrations and controllers for the main entities (Memo, Applicant, Timekeeping, Payroll, Leave, Complaint, Appointment).
2. Implement authentication and role middleware (HR vs Employee vs Guest).
3. Build core HR pages (Applicant queue, Timekeeping, Payroll) with React + Inertia and Tailwind UI components.
4. Implement payroll calculation functions and unit tests.
5. Add email workflows (appointments, applicant confirmations) and queue processing.

If you'd like, I can scaffold the migrations, models and basic controllers next and create the initial React pages with Inertia. Tell me which piece you'd like me to start with and I'll mark it in the todo list and begin.

## Contact

For questions about setup or architecture decisions, open an issue or message the project owner.

---

Generated based on the feature list you provided. Use this README as the central spec while we implement features incrementally.
