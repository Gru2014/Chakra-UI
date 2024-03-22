"use client"
import { useEffect, useState, SetStateAction, Dispatch } from 'react';


const css = `
.tracked-with-analytics::after {
  content: '';
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 50%;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1000;
}
`;

const useGlobalHover = (onOpen: () => void, componentPropertyOpened: boolean, setMenuItem: Dispatch<SetStateAction<number>>) => {

  const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const floatingIndicator = document.createElement('div');
      floatingIndicator.textContent = 'Tracking Active (right click to show details)';
      floatingIndicator.style.position = 'fixed';
      floatingIndicator.style.padding = '4px 8px';
      floatingIndicator.style.background = 'red';
      floatingIndicator.style.color = 'white';
      floatingIndicator.style.zIndex = '10000';
      floatingIndicator.style.display = 'none';
      floatingIndicator.style.borderRadius = '4px';
      floatingIndicator.style.fontSize = '12px';
      floatingIndicator.style.boxShadow = '0px 2px 6px rgba(0,0,0,0.2)';
      floatingIndicator.setAttribute('id', 'tracking-indicator');
      floatingIndicator.setAttribute('data-id', 'tracking-indicator');


      document.body.appendChild(floatingIndicator);

      const parentOfMenu = document.getElementById("menu-event") as HTMLElement; // get the button element by id


      const menu = document.getElementById("menu") as HTMLElement; // get the menu element by id
      const viewEventsButton = document.getElementById("view-events") as HTMLElement; // get the menu element by id
      const viewPropertiesButton = document.getElementById("view-properties") as HTMLElement; // get the menu element by id
      const viewRevisionsButton = document.getElementById("view-revisions") as HTMLElement; // get the menu element by id

      const handleRightClick = (e: MouseEvent) => {
        if (isHighlightEnabled) {
          e.preventDefault(); // Prevent the context menu from opening
          // onOpen(); // Call the callback function to open the modal
          const x = e.clientX; // get the cursor x position
          const y = e.clientY; // get the cursor y position
          menu.style.left = x + "px"; // set the menu left position to x
          menu.style.top = y + "px"; // set the menu top position to y
          menu.style.display = "block"; // show the menu element
        }
      };

      const removeMenu = (e: MouseEvent) => {
        if (isHighlightEnabled) {
          const target = e.target as HTMLElement;
          if (target.id !== "menu") {
            menu.style.display = "none";
          }
        }
      }



      const toggleHighlight = (event: KeyboardEvent) => {
        // Use Ctrl + Shift + X to toggle the highlight
        if (event.shiftKey && event.code === 'KeyX') {
          setIsHighlightEnabled(prev => !prev);
          console.log(isHighlightEnabled);
        }
      };

      if (componentPropertyOpened && document.getElementById('tracking-indicator')) {
        let elements = document.querySelectorAll('[data-id="tracking-indicator"]');
        elements.forEach(element => {
          (element as HTMLElement).style.display = 'none';
        })
      }

      const addHighlight = (e: Event) => {
        if (isHighlightEnabled) {
          //const target = e.target as HTMLElement;
          //target.style.outline = '2px solid magenta'; // Add your highlight style here
          const target = e.target as HTMLElement;
          if (target.id === "tracking-indicator" || componentPropertyOpened) {
            return;
          }

          target.style.outline = '2px solid magenta';
          const rect = target.getBoundingClientRect();
          floatingIndicator.style.top = `${window.scrollY + rect.top - floatingIndicator.offsetHeight - 5}px`;
          floatingIndicator.style.left = `${window.scrollX + rect.left + (rect.width - floatingIndicator.offsetWidth) / 2}px`;
          floatingIndicator.style.display = 'block';
        }
      };

      const removeHighlight = (e: MouseEvent) => {
        if (isHighlightEnabled) {

          if (componentPropertyOpened) {
            floatingIndicator.style.display = 'none';
          }
          //const target = e.target as HTMLElement;
          //target.style.outline = '';  
          const target = e.target as HTMLElement;
          if ((e.target as HTMLElement).id !== 'tracking-indicator') {
            target.style.outline = '';
            floatingIndicator.style.display = 'none';
          }
        }
      };

      const handleOpenModal = (menuItem: number) => {
        onOpen()
        setMenuItem(menuItem)
      }

      document.addEventListener('click', removeMenu);
      document.addEventListener('keydown', toggleHighlight);
      // Attach event listeners to the document
      parentOfMenu.addEventListener('contextmenu', handleRightClick);
      parentOfMenu.addEventListener('mouseover', addHighlight);
      parentOfMenu.addEventListener('mouseout', removeHighlight);
      viewEventsButton.addEventListener('click', () => handleOpenModal(1));
      viewPropertiesButton.addEventListener('click', () => handleOpenModal(2));
      viewRevisionsButton.addEventListener('click', () => handleOpenModal(3));

      // Clean up event listeners
      return () => {
        document.removeEventListener('click', removeMenu);
        document.removeEventListener('keydown', toggleHighlight);
        parentOfMenu.removeEventListener('mouseover', addHighlight);
        parentOfMenu.removeEventListener('mouseout', removeHighlight);
        parentOfMenu.removeEventListener('contextmenu', handleRightClick);
        viewEventsButton.removeEventListener('click', () => handleOpenModal(1));
        viewEventsButton.removeEventListener('click', () => handleOpenModal(2));
        viewEventsButton.removeEventListener('click', () => handleOpenModal(3));
      };
    }

  }, [isHighlightEnabled, onOpen, componentPropertyOpened, setMenuItem]); // Empty dependency array ensures this effect runs once on mount
};

export default useGlobalHover;