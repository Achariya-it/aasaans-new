import CourseCard from '../CourseCard';
import webDevThumb from '@assets/generated_images/Web_development_course_thumbnail_b1ecacd9.png';
import dataThumb from '@assets/generated_images/Data_science_course_thumbnail_5994dabd.png';

export default function CourseCardExample() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            id="web-dev"
            title="Complete Web Development Bootcamp"
            instructor="Dr. Angela Yu"
            thumbnail={webDevThumb}
            duration="40 hours"
            skillPoints={200}
          />
          <CourseCard
            id="data-science"
            title="Data Science & Machine Learning"
            instructor="Jose Portilla"
            thumbnail={dataThumb}
            duration="35 hours"
            skillPoints={250}
            enrolled={true}
            progress={65}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Cards</h3>
        <div className="space-y-4">
          <CourseCard
            id="web-dev-h"
            title="Complete Web Development Bootcamp"
            instructor="Dr. Angela Yu"
            thumbnail={webDevThumb}
            duration="40 hours"
            skillPoints={200}
            variant="horizontal"
            enrolled={true}
            progress={45}
          />
        </div>
      </div>
    </div>
  );
}
