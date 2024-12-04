import BaseComponent from '@components/base.component';
import { type Locator } from '@playwright/test';
import { Review } from 'src/types/review';
import { step } from 'src/decorators/step';

class ReviewComponent extends BaseComponent {
  protected override readonly rootLocator: Locator = this.page.locator('.product-reviews');

  private readonly titleInput: Locator = this.rootLocator.getByPlaceholder('Enter Review title');
  private readonly commentInput: Locator = this.rootLocator.getByPlaceholder('Write Review');
  private readonly rating: Locator = this.rootLocator.getByLabel('add rating');
  private readonly recommendation: Locator = this.rootLocator.locator('.select-container');
  private readonly recommendationSelect: Locator = this.rootLocator.locator(
    '.react-select__menu-list',
  );
  private readonly publishButton: Locator = this.rootLocator.getByRole('button', {
    name: 'Publish Review',
  });

  @step()
  public async add(review: Review): Promise<void> {
    await this.expectLoaded();

    await this.titleInput.fill(review.title);
    await this.commentInput.fill(review.comment);
    await this.rating.locator(`span[data-index="${review.rating - 1}"]`).click();
    await this.recommendation.click();
    await this.recommendationSelect.getByText(review.recommendation, { exact: true }).click();
    await this.publishButton.click();
  }
}

export default ReviewComponent;
