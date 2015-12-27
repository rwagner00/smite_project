* item
    * Item example:
        * ```<img src="http://placehold.it/100x100" alt="item_1" id="a"
             class="item_equipment dragElement" data-cost="1100" data-stacking="1"
             data-max_stacks="50" data-units_per_stack="5" data-stack_attr="power" data-hp="400"
             data-mana="100" data-phys_resist="30" data-magic_resist="45" data-cooldown_reduction="20"
             data-mp5="8">```
        * This item has all possible attributes, which is unlikely in an actual item. For attributes which are not present on an item, omit that attribute.
    * DOM type
        * <img>
    * Attributes
        * \#ID - Item Machine Name
        * Classes
            * .item_equipment
            * .dragElement
        * Data Attributes
            * Attributes should be in the format: data[hyphen][attribute_machine_name] where machine name uses underscores.
            * Cost - data-cost
            * Stacking - Boolean - data-stacking
            * Max Stacks - data-max_stacks
            * Units per stack - data-units_per_stack
            * Attribute stacked - data-stack_attr
            * HP - data-hp
            * Mana - data-mana
            * Physical Damage Reduction - data-phys_resist
            * Magic Damage Reduction - data-magic_resist
            * Cooldown Reduction - data-cooldown_reduction
            * Mana Regen - data_mp5
        * Src - Image thumbnail for item
     
