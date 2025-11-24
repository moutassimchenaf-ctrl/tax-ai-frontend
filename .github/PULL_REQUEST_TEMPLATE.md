# Pull Request

## Description
<!-- Provide a brief description of the changes in this PR -->

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)
- [ ] Documentation update
- [ ] Dependency update

## Checklist

### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] TypeScript compilation passes with no errors

### Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Test coverage is maintained or improved (90%+ target)

### Accessibility (A11y)
- [ ] I have tested my changes with a screen reader
- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] axe-core accessibility tests pass

### Performance
- [ ] I have run Lighthouse and the Performance score is 95+
- [ ] I have checked bundle size impact (use `npm run analyze`)
- [ ] Heavy components are lazy loaded
- [ ] Images are optimized (AVIF/WebP)
- [ ] Animations respect `prefers-reduced-motion`

### 3D & Motion (if applicable)
- [ ] 3D assets are optimized (DRACO compression)
- [ ] Textures use KTX2 compression
- [ ] Frame rate is stable (60fps target)
- [ ] Scroll animations are smooth and performant

### Documentation
- [ ] I have updated the documentation accordingly
- [ ] I have added JSDoc comments to new functions/components
- [ ] I have updated `docs/components.md` if adding new components

### Security
- [ ] No sensitive data is exposed in the code
- [ ] All user inputs are validated
- [ ] XSS protection is in place (DOMPurify for dangerouslySetInnerHTML)

## Screenshots/Videos
<!-- If applicable, add screenshots or videos to help explain your changes -->

## Related Issues
<!-- Link to related issues: Fixes #123, Closes #456 -->

## Additional Notes
<!-- Any additional information that reviewers should know -->
