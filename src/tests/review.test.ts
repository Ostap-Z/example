import { Review } from 'src/types/review';
import { loggedInWithNewUserFixture } from 'src/fixtures/fixtures';

const review: Review = {
  title: 'Test title',
  comment: 'Test comment',
  rating: 5,
  recommendation: 'Yes',
};

loggedInWithNewUserFixture.describe('Review', () => {
  loggedInWithNewUserFixture('Logged in user can leave a review', async ({ app }) => {
    await app.shopPage.open();
    await app.shopPage.products.openByName('CHERRY TOMATOES By Nizhyn');
    await app.productPage.review.add(review);
    await app.productPage.notification.expectHasHeading('Your review has been added');
  });
});
