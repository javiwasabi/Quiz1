
# Automated Functional Test Documentation

## Overview
This document describes the steps and success criteria for the automated functional test.

## Workflow
1. Navigate to the initial page: `http://localhost:3500`.
2. Wait for the page to load completely.
3. Click the **START** button to proceed to the next page.
4. On the **MiddlePage**:
   - Solve questions by selecting either **Killer** or **Inventor**.
   - Click the **NEXT** button to continue.
   - Repeat until the **FinalPage** is reached.
5. On the **FinalPage**:
   - Click the **Email** icon.
   - Enter the email address in the provided input field.
   - Check both checkboxes.
   - Submit the form by clicking the **Submit** button.

## Success Criteria
- All interactions (button clicks, selections, and form submissions) should complete without errors.
- The final form submission should succeed, and no exceptions should occur.

## Error Handling
- Screenshots are captured if an error occurs, stored as `error.png` or `error_next_button.png` for debugging.

## Notes
- The script closes the browser automatically after 3 seconds of inactivity.
- Ensure the server is running at `http://localhost:3500` before executing the script.

---

### Generated By: Automated Test Script
    