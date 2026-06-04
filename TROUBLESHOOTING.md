# Troubleshooting Guide

## Common Issues & Solutions

### Theme Stuck on Invalid Value (FIXED ✓)
**Symptoms:**
- Theme appears stuck on "high contrast" or another invalid value
- Theme switcher doesn't change the appearance
- Page styling looks wrong
- Console errors: "Refused to apply style... MIME type ('text/html')"

**Root Cause:** 
1. Browser localStorage contains an invalid or legacy theme value
2. Theme CSS assets were not configured in angular.json

**Solution (IMPLEMENTED):**
The app now uses the official `@fundamental-ngx/core/theming` service:

1. **Asset Configuration** - Theme CSS files are served from `assets/`:
   - Base theming: `assets/theming-base/{theme}/css_variables.css`
   - Fundamental styles: `assets/fundamental-styles-theming/{theme}.css`

2. **Automatic Legacy Conversion** - Converts old theme names:
   - `'high contrast'` → `'sap_horizon_hcb'`
   - `'sap_fiori_3_hc_black'` → `'sap_horizon_hcb'`
   - Other legacy values are converted automatically

3. **Invalid Value Reset** - Completely invalid values reset to `'sap_horizon'`

**Manual Fix (if needed):**
Open browser DevTools Console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

Or use the **"Reset to Defaults"** button in the user menu.

**Valid Theme Values:**
- `sap_horizon` - Horizon Light (default)
- `sap_horizon_dark` - Horizon Dark  
- `sap_horizon_hcb` - High Contrast Black
- `sap_horizon_hcw` - High Contrast White

**How It Works:**
- Theme switching uses `@fundamental-ngx/core/theming` service
- CSS files are dynamically loaded via `<link>` tags
- Both SAP theming variables and Fundamental Styles are applied
- Changes take effect immediately without page reload

### ThemingService Provider Error
**Error:** `No provider found for ThemingService`

**Solution:** Already fixed! `provideTheming()` and `themingInitializer()` are configured in `app.config.ts`.

### Dialog Not Opening
**Issue:** Review dialog doesn't appear when clicking "Review" button.

**Workaround:** The dialog component needs the `DialogService` to be opened programmatically. Current implementation uses basic `fd-dialog` which can be enhanced with:
```typescript
import { DialogService } from '@fundamental-ngx/core/dialog';
// Inject and use dialogService.open()
```

### Port Already in Use
**Error:** `Port 4200 is already in use`

**Solution:**
```bash
ng serve --port 4300
# or any other available port
```

### Icons Not Displaying
**Issue:** Side navigation icons not showing (sap-icon--home, sap-icon--employee)

**Solution:** The icons are using SAP icon font which should be loaded via fundamental-styles. If missing, they'll appear as text labels which is acceptable for this demo.

### Date Picker Issues
**Issue:** Date picker not opening or formatting incorrectly

**Note:** The `fd-date-picker` component may require additional configuration for locale and date formatting. Current implementation uses default settings.

## Development Commands

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache and restart
npm cache clean --force
npm install
ng serve

# Check for errors
ng build --configuration development
```

## Feature Status

✅ **Working:**
- Dashboard with metrics
- Employee table display
- Theme switching (Light/Dark/HC)
- Content density toggle
- Side navigation routing
- Form validation

⚠️ **Partially Implemented:**
- Dialog opening (needs DialogService integration)
- i18n (UI ready, language switching needs FdLanguage service)
- Date pickers (basic implementation, may need locale config)

## Next Steps for Enhancement

1. **Dialog Service Integration:**
   ```typescript
   import { DialogService } from '@fundamental-ngx/core/dialog';
   
   openDialog(employee: Employee) {
     this.dialogService.open(ReviewDialogComponent, {
       data: { employee }
     });
   }
   ```

2. **i18n Setup:**
   - Configure FdLanguage service properly
   - Add translation files for BG and FR
   - Use FdTranslatePipe in templates

3. **BTP Vertical Navigation:**
   - Replace simple side nav with `fdb-navigation`
   - Requires proper import of FDB_NAVIGATION module

4. **Table Enhancements:**
   - Add sorting functionality
   - Add department filter dropdown
   - Add pagination for larger datasets

## Browser Console Warnings

Some warnings about SAP theming CSS variables are **expected** and don't affect functionality:
```
Expected identifier but found "\"Build\""
```

These are from the `@sap-theming/theming-base-content` package and are safe to ignore.
